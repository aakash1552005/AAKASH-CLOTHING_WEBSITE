import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SizeGuidePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <p className="section-label mb-4">Fit Guide</p>
        <h1 className="heading-display text-5xl mb-8">Size Guide</h1>
        <div className="space-y-10 font-body text-sm text-brand-slate">
          <p className="leading-relaxed">All measurements are in centimetres. If you are between sizes, we recommend sizing up for a relaxed fit.</p>
          <div>
            <h2 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-4">Tops & Shirts</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-light-gray">
                  <th className="text-left py-2 font-medium">Size</th>
                  <th className="text-left py-2 font-medium">Chest</th>
                  <th className="text-left py-2 font-medium">Waist</th>
                  <th className="text-left py-2 font-medium">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light-gray">
                {[['XS','82–86','68–72','68'],['S','86–90','72–76','70'],['M','90–96','76–82','72'],['L','96–102','82–88','74'],['XL','102–108','88–94','76'],['XXL','108–116','94–102','78']].map(([size,chest,waist,length]) => (
                  <tr key={size}>
                    <td className="py-2">{size}</td>
                    <td className="py-2">{chest}</td>
                    <td className="py-2">{waist}</td>
                    <td className="py-2">{length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-4">Pants</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-light-gray">
                  <th className="text-left py-2 font-medium">Size</th>
                  <th className="text-left py-2 font-medium">Waist</th>
                  <th className="text-left py-2 font-medium">Hip</th>
                  <th className="text-left py-2 font-medium">Inseam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light-gray">
                {[['28','70–72','90–92','76'],['30','74–76','94–96','77'],['32','78–82','98–102','78'],['34','84–88','104–108','79'],['36','90–94','110–114','80'],['38','96–100','116–120','81']].map(([size,waist,hip,inseam]) => (
                  <tr key={size}>
                    <td className="py-2">{size}</td>
                    <td className="py-2">{waist}</td>
                    <td className="py-2">{hip}</td>
                    <td className="py-2">{inseam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}