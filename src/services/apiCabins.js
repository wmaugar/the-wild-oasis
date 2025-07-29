//Reference to supabase documentation

import supabase from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function getCabins() {
  // from the supabase client we can now create queries with the FROM METHOD, so we specify the name of the table and the fields that we want (* means all of them)
  // this returns a promise, which then await and the result of that give us the data and a possible error.
  // if there is no a error, then return data

  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  //Check if already exists an image path
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Me make sure that this name is unique
  // Really important: Also replaces any dashes / with nothing
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://bjltvwwneytexhymgwcr.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  //1.Create/edit cabin
  let query = supabase.from("cabins");
  // Create if there is no ID (ID means editing session)
  // A) CREATE

  // Here add image as an image path
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // If there is an ID then EDIT
  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. Upload image
  // If it doesn't have image path then upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
