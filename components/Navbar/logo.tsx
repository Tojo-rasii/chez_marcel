import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <h2 className="font-heading text-yellow-500 cursor-pointer max-md:text-lg text-xl font-semibold text-black/80">
        <span>Chez Marcel</span><span className="max-sm:hidden">&nbsp;-&nbsp;Click & Services</span> 
      </h2>
    </div>
  );
}
