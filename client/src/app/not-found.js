import Link from "next/link";
import Image from "next/image";
import notfound from "../../public/user/notfoundpage.svg";

export default function NotFound() {
  return (
    <>
      <div>
        <div className="flex justify-center items-center">
          <Image src={notfound} alt={Image} />
        </div>
        <div className="flex justify-center items-center">
        <button className="border border-[black] px-3 py-2 rounded-md hover:bg-[gray] hover:text-[white]">
          <Link href="/user/sign-in">Return to Home</Link>
          </button>
        </div>
      </div>
    </>
  );
}
