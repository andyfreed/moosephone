// Script to create the admin user
// Run: npx tsx scripts/create-admin.ts
//
// Requires .env.local to have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const email = "a.freed@outlook.com";
  const password = "Emmy2016Isla2020!";

  // Create user via admin API (auto-confirms email)
  const { data: user, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: "Andy Freed" },
  });

  if (createError) {
    // If user already exists, find them
    if (createError.message.includes("already been registered")) {
      console.log("User already exists, updating admin status...");
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) {
        console.error("Failed to list users:", listError.message);
        process.exit(1);
      }
      const existing = users.find((u) => u.email === email);
      if (!existing) {
        console.error("Could not find existing user");
        process.exit(1);
      }
      // Set admin flag
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_admin: true })
        .eq("id", existing.id);

      if (updateError) {
        console.error("Failed to set admin:", updateError.message);
        process.exit(1);
      }
      console.log(`Set ${email} as admin.`);
      return;
    }

    console.error("Failed to create user:", createError.message);
    process.exit(1);
  }

  console.log(`Created user: ${email} (id: ${user.user.id})`);

  // The trigger should auto-create the profile, but set admin flag
  // Wait a moment for the trigger to fire
  await new Promise((r) => setTimeout(r, 1000));

  const { error: adminError } = await supabase
    .from("profiles")
    .update({ is_admin: true })
    .eq("id", user.user.id);

  if (adminError) {
    console.error("Failed to set admin flag:", adminError.message);
    process.exit(1);
  }

  console.log(`${email} is now an admin.`);
}

main();
