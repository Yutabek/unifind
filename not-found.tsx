import { NotFoundView } from "@/components/site/NotFoundView";
import { getDict } from "@/lib/dictionaries";

export default async function NotFound() {
  const [uz, ru, en] = await Promise.all([getDict("uz"), getDict("ru"), getDict("en")]);
  return <NotFoundView copy={{ uz: uz.notFound, ru: ru.notFound, en: en.notFound }} />;
}
