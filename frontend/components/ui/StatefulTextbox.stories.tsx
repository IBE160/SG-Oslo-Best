
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"
import { StatefulTextbox } from "./StatefulTextbox"
import { Button } from "./button"
import { Label } from "./label"

const meta: Meta<typeof StatefulTextbox> = {
  title: "UI/StatefulTextbox",
  component: StatefulTextbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "radio",
      options: ["input", "textarea"],
    },
  },
}

export default meta

type Story = StoryObj<typeof StatefulTextbox>

export const Default: Story = {
  args: {
    placeholder: "This is the default state",
    as: "input",
  },
}

export const Unsaved: Story = {
  args: {
    ...Default.args,
    isDirty: true,
    placeholder: "This is the unsaved state",
  },
}

export const Saved: Story = {
  args: {
    ...Default.args,
    isSaved: true,
    placeholder: "This is the saved state",
  },
}

export const Saving: Story = {
  args: {
    ...Default.aargs,
    isSaving: true,
    placeholder: "This is the saving state",
  },
}

export const WithTextarea: Story = {
  args: {
    as: "textarea",
    placeholder: "This is a textarea",
  },
}

export const UnsavedTextarea: Story = {
  args: {
    ...WithTextarea.args,
    isDirty: true,
  },
}

export const WithReactHookForm: Story = {
  render: function Render(args) {
    const {
      register,
      handleSubmit,
      formState: { isDirty, isSubmitting, isSubmitSuccessful },
    } = useForm({ defaultValues: { firstName: "" } })

    const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000))

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-72">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <StatefulTextbox
            {...args}
            {...register("firstName")}
            id="firstName"
            isDirty={isDirty}
            isSaving={isSubmitting}
            isSaved={isSubmitSuccessful}
          />
        </div>
        <Button type="submit">
          {isSubmitting ? "Saving..." : "Submit to Save"}
        </Button>
      </form>
    )
  },
  args: {
    as: "input",
    placeholder: "Enter your first name...",
  },
}
