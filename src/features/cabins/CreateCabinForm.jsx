import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  // Check if we are editing or creating a cabin
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  // formState give us the state of form, here we use it to obtain errors info
  const { errors } = formState;
  // queryClient get value of useQueryClient hook, so you can access to CACHED data

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            // This function will be conditionally called,  only if exits onCloseModal property
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            // This function will be conditionally called,  only if exits onCloseModal property
            onCloseModal?.();
          },
        }
      );
  }

  //this function will be called if there is some error on form submission
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        label="Cabin name"
        disabled={isWorking}
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        disabled={isWorking}
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        disabled={isWorking}
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        disabled={isWorking}
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            //This validation uses a callback funcion
            //getValues returns the values of every field on form

            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          // This tell react form to ask for this input as a mandatory.
          {...register("image", {
            // Require upload a image if it is a CREATING SESSION, OPPOSITE TO EDIT SESSION
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          // This function will be conditionally called,  only if exits onCloseModal property
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        {/* Check if is an Edit Session or Create cabin session */}
        <Button>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
