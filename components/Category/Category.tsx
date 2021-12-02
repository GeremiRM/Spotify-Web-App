import { useRouter } from "next/router";

// components
import { Banner } from "./Banner/Banner";
import { Cards } from "../Common/Cards";

// styling
import styles from "./Category.module.scss";

// hook
import { useCategoryInfo } from "../../hooks/useCategoryInfo";

export const Category: React.FC<{}> = ({}) => {
  //  category id
  const router = useRouter();
  const { id } = router.query;

  const { category, categoryPlaylists } = useCategoryInfo(id as string);

  if (!category || !categoryPlaylists) return <></>;

  return (
    <div className={styles.category}>
      <div>
        <Banner title={category.name} />
        <Cards
          data={categoryPlaylists}
          title="Featured Playlists"
          multirow
          hideLink
        />
      </div>
    </div>
  );
};
