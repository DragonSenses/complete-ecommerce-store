import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";

// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

export default function HomePage() {

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={ } />
      </div>
    </Container>
  )
}
