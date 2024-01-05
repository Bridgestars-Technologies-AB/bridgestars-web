import sizeOf from "image-size";
import * as mime from "mime";
import fail, {CODE} from "../utils/fail";

Parse.Cloud.beforeSaveFile(async ({ file, user }) => {
  file.addTag("createdBy", user?.id);

  const fileData = await file.getData(); //base64 encoded
  const mimeType = mime.getType(file.name());
  const size = Buffer.byteLength(fileData, "utf8") / 1e3; //kB
  if (mimeType?.includes("image")) {
    const img = new Buffer(fileData, "base64");
    const dim = sizeOf(img);

    console.log(dim.width, dim.height);
    const max = 256;
    console.log("fileSize: ", size, " kB");
    if (!dim.width || !dim.height)
      fail( "Image size could not be read, image is probably corrupt.", CODE.FileSaveError)
    if (dim.width > max || dim.height > max)
      fail(
        `Image size is ${dim.width}x${dim.height} which is larger than max size: ${max}x${max}.`, 
        CODE.FileTooLarge
      )
  } else if (mimeType === "text/plain") {
    //.txt
    //clamp size, or dont allow for now
    console.log("uploading textfile, fileSize: ", size, " kB");
  } else if (mimeType === "application/octet-stream") {
    //.bin

    console.log("fileSize: ", size, " kB");
  } else {
    fail(`File type not supported, contact administrator. (fileSize: ${size} kB). (fileType: ${mime.getType(file.name())}). (fileName: ${file.name()})`, CODE.InvalidFileName);
  }

  if (size > 512)
    fail(`File exceeds maximum size limit ${size} kB > 512 kB`, CODE.FileTooLarge)

  const newFile: Parse.File = new Parse.File("parsefile_" + file.name(), {
    base64: fileData,
  });
  newFile.setMetadata(file.metadata);
  newFile.setTags(file.tags);

  return newFile;
});
