import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Images from "./page-content";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-images"
  );

  return {
    title: t("title"),
  };
}

export default Images;
