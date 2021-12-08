import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import { Banner } from "./Banner/Banner";
import { Cards } from "../Common/Cards";
import { Loading } from "../Common/Loading";

// styling
import styles from "./Category.module.scss";

// hook
import { useCategoryInfo } from "../../hooks/useCategoryInfo";

export const Category: React.FC<{}> = ({}) => {
  //  category id
  const router = useRouter();
  const { id } = router.query;

  const { category, categoryPlaylists } = useCategoryInfo(id as string);

  if (!category || !categoryPlaylists) return <Loading />;

  return (
    <>
      <Header />
      <div className={styles.category}>
        {/* Banner */}
        <div className={styles.banner}>
          <Banner title={category.name} />
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Cards */}
          <Cards
            data={categoryPlaylists}
            title="Featured Playlists"
            multirow
            hideLink
          />
        </div>
      </div>
    </>
  );
};
