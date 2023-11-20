import "parse/node";
import fail, { CODE } from "./fail";

export async function removeAllAssociatedSessions(user: Parse.User) {
  const query = new Parse.Query("_Session");
  query.equalTo("user", user);
  return query.find({ useMasterKey: true }).then((obj) => {
    obj.forEach((s) => {
      console.log(
        "deleting session: " + s.id + " for user: " + s.get("user").id,
      );
      s.destroy({ useMasterKey: true }).catch((e) => console.log(e));
    });
  });
}

export async function hasRoleBool(
  roleName: string,
  user: Parse.User | undefined,
): Promise<boolean> {
  if (!user) return false;
  var roleQuery = new Parse.Query(Parse.Role);
  roleQuery.equalTo("name", roleName);
  roleQuery.equalTo("users", user);

  const role = await roleQuery.first({ useMasterKey: true });
  if (!role) return false;
  else return true;
}

export async function createRole(roleName: string) {
  const acl = new Parse.ACL();
  return new Parse.Role(roleName, acl).save(null, { useMasterKey: true });
}

export async function deleteRole(roleName: string) {
  const role = await new Parse.Query(Parse.Role)
    .equalTo("name", roleName)
    .first({ useMasterKey: true });
  if (role) return role.destroy({ useMasterKey: true });
}

export async function hasRoleAsync(
  roleName: string,
  user: Parse.User | undefined,
): Promise<void> {
  if (!user) return Promise.reject(new Error("User not authenticated"));
  var q = new Parse.Query(Parse.Role);
  q.equalTo("name", roleName);
  q.equalTo("users", user);

  return q.first({ useMasterKey: true }).then(function (admin) {
    console.log(JSON.stringify(admin));
    if (!admin) {
      fail("User is missing role: " + roleName, CODE.Unauthorized);
    }
  });
}

export async function addRoleAsync(
  roleName: string,
  user: Parse.User | undefined,
): Promise<void> {
  if (!user) fail("Internal: User not found", CODE.ObjectNotFound);
  const role = await new Parse.Query(Parse.Role).equalTo("name", roleName)
    .first({ useMasterKey: true });
  if (!role) {
    fail("Internal: Role not found [" + roleName + "]", CODE.InvalidRoleName);
  }

  role.getUsers().add(user);
  await role.save(null, { useMasterKey: true });
}
export async function stripRoleAsync(
  roleName: string,
  user: Parse.User | undefined,
): Promise<void> {

  if (!user) fail("Internal: User not found", CODE.ObjectNotFound);

  const role = await new Parse.Query(Parse.Role).equalTo("name", roleName)
    .first({ useMasterKey: true });

  if (!role) {
    fail("Internal: Role not found [" + roleName + "]", CODE.InvalidRoleName);
  }

  role.getUsers().remove(user);
  await role.save(null, { useMasterKey: true });
}

export function isAdminAsync(user: Parse.User | undefined): Promise<void> {
  return hasRoleAsync("admin", user);
}

export function isAdminBool(user: Parse.User | undefined): Promise<boolean> {
  return hasRoleBool("admin", user);
}

export async function listRoles(user: Parse.User): Promise<string[]> {
  var q = new Parse.Query(Parse.Role);
  q.equalTo("users", user);
  q.select("name");
  return q
    .findAll({ useMasterKey: true })
    .then((xs) => xs.map((x) => x.get("name")));
}
