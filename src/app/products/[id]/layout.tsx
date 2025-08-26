export async function generateStaticParams() {
  return [
    { id: "maven-wide-leg-cropped-pants" },
    { id: "maven-wide-leg-pants-black" },
    { id: "maven-wide-leg-pants-navy" },
    { id: "maven-wide-leg-pants-olive" },
  ];
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}