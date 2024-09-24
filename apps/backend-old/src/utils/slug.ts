export function generateSlug(title: string, id: string): string {
  let prefix = title.toLowerCase();

  const replace = [
    [/ /g, "-"],
    [/ä/g, "a"],
    [/å/g, "a"],
    [/ö/g, "o"],
  ];

  replace.forEach((r) => {
    prefix = prefix.replace(r[0], 
      (r[1] as any)
    );
  })
  return prefix + "-" + id;
}
export function createAndSaveSlug(obj:Parse.Object, key:string = "title"){
  obj.set("slug", generateSlug(obj.get(key), obj.id));
  obj.save(null, {
    useMasterKey: true,
    context: { noValidation: true },
  });
}

export function updateSlug(obj:Parse.Object, key:string = "title"){
  if(obj.dirty(key))
    obj.set("slug", generateSlug(obj.get(key), obj.id));
}
