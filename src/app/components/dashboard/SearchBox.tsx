import Image from "next/image"

export default function SearchBox() {
    return (
        <div>
             {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search ..."
            className="pl-10 pr-4 py-2 border-none rounded-lg w-60 focus:outline-none focus:border-gold1 text-tgrey3 bg-tgrey4"
            aria-label="Search"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src="/search.svg" width={15} height={15} alt="Search icon" />
          </span>
        </div>
        </div>
    )

}