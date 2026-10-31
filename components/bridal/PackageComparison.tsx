import { Check, Minus } from "lucide-react";
import { comparisonAttributes, type BridalPackage } from "@/data/bridal-packages";

/** Renders only when at least one package has verified inclusions. */
export function PackageComparison({ packages }: { packages: BridalPackage[] }) {
  const comparable = packages.filter((p) => p.included && p.included.length > 0);
  if (comparable.length < 2) return null;
  const has = (p: BridalPackage, attr: string) => p.included!.some((i) => i.toLowerCase() === attr.toLowerCase());

  return (
    <div className="overflow-x-auto border border-plum/15 bg-white">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="sr-only">Comparison of confirmed package inclusions</caption>
        <thead>
          <tr className="border-b border-plum/15 bg-blush/40">
            <th scope="col" className="p-4 font-medium">Inclusion</th>
            {comparable.map((p) => (
              <th key={p.slug} scope="col" className="p-4 font-serif text-lg font-semibold text-plum">
                {p.name}
                <span className="block font-sans text-xs font-normal text-espresso/70">{p.price ?? "Request Package Details"}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonAttributes.map((attr) => (
            <tr key={attr} className="border-b border-plum/10 last:border-0">
              <th scope="row" className="p-4 font-normal">{attr}</th>
              {comparable.map((p) => (
                <td key={p.slug} className="p-4">
                  {has(p, attr) ? (
                    <><Check size={18} className="text-gold-deep" aria-hidden /><span className="sr-only">Included</span></>
                  ) : (
                    <><Minus size={18} className="text-espresso/30" aria-hidden /><span className="sr-only">Not listed</span></>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
