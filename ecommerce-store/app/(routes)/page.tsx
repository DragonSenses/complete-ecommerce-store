import getBillboard from "@/actions/getBillboard";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";

// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

export default async function HomePage() {

  const billboard = await getBillboard();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  )
}
