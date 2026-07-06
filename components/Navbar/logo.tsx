import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <h2 className="font-heading cursor-pointer max-md:text-lg text-xl font-semibold text-yellow-500">
        <span>Chez Marcel</span><span className="max-sm:hidden">&nbsp;-&nbsp;Click & Services</span> 
      </h2>
    </div>
  );
}
