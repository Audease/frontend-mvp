import { SlArrowLeft } from "react-icons/sl";
import { useRouter } from "next/navigation";


const PersonaBackButton = () => {
    const router = useRouter();
  return (
    <div className="pt-1 ">
          <button
            className="flex flex-row space-x-2 text-tgrey3"
            type="button"
            onClick={() => router.push("/admin")}
          >
            <div className="pt-2">
              <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
            </div>
            <p className="font-medium text-base">Back</p>
          </button>
        </div>
  )
}

export default PersonaBackButton
