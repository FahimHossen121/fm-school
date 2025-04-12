export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <h1>{`This is the ${slug} page`}</h1>
    </>
  );
}
