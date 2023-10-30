import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";

// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

export default async function HomePage() {

  // Fetch featured products
  const products = await getProducts({isFeatured: true});

  // Fetch billboard
  const billboard = await getBillboard("5129787f-d293-45dc-9c72-e6fe2e290ca9");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>

    </Container>
  )
}
