import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <h2 className="font-heading max-md:text-lg text-xl font-semibold text-yellow-500">
        <span>Chez Marcel</span>&nbsp;-&nbsp;<span className="max-sm:hidden">Click & Services</span> 
      </h2>
    </div>
  );
}
