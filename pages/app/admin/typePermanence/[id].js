import { useRouter } from "next/router";

const TypePermanenceItem = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h2>
        is placed in {id}
      </h2>
    </>
  );
};

export default TypePermanenceItem;