const ACL = { name: "ACL" };
const stamps = [{ name: "createdAt" }, { name: "updatedAt" }];
const defaults = [...stamps, ACL];

export default {
  // "_Installation": [],
  // "_Role": [],
  // "_Session": [],
  "_User": [
    { name: "dispName" },
    { name: "username" },
    { name: "password" },
    { name: "email" },
    { name: "plan" },
    { name: "plan_status" },
    { name: "createdAt" },
    { name: "updatedAt" },
    { name: "lang" },
    { name: "img" },
    { name: "emailVerified" },
    { name: "authData" },
    ACL,
  ],
  // "Answer": [],
  "Chapter": [
    { name: "course" },
    { name: "idx" },
    { name: "title" },
    { name: "desc" },
    { name: "n_prob" },
    { name: "slug" },
    ...defaults
  ],
  "Course": [
    { name: "idx" },
    { name: "title" },
    { name: "desc" },
    { name: "n_chap" },
    { name: "n_user" },
    { name: "users" },
    { name: "slug" },
    ...defaults
  ],
  "Problem": [
    { name: "idx" },
    { name: "chap" },
    { name: "title" },
    { name: "n" },
    { name: "s" },
    { name: "w" },
    { name: "e" },
    { name: "sol" },
    { name: "com" },
    { name: "desc" },
    ...defaults
  ],
  "Progress": [
    { name: "chapter" },
    { name: "user" },
    { name: "progress" },
    ...defaults,
  ],
  "UserInfo": [
    { name: "user" },
    { name: "last_login" },
    { name: "emails_sent" },
    { name: "migrated" },
    { name: "stripe_cus_id" },
    ...defaults,
  ],
};
