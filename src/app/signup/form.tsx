import InputField from "../components/inputField";

export default function Form() {
    return (
      <form>
        <div className="text-tblack">
            <h3 className="font-semibold  text-h3">Sign Up</h3>
            <p className="font-normal text-h2">Already have an account? <span className="text-h2 text-link1">Sign In</span></p>
        </div>
        <div>
            <InputField />
        </div>
      </form>
    )
  }