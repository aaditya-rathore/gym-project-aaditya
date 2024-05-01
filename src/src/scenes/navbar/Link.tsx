import { SelectedPage } from '@/shared/types';
import AnchorLink from 'react-anchor-link-smooth-scroll'

type Props = {
    page: string;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const Link = ({page,selectedPage,setSelectedPage,
}: Props) => {
  const lowercasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
  return (
    <AnchorLink
      href={`#${lowercasePage}`}
      className={`${selectedPage === lowercasePage ? "text-primary-500" : " "} hover:text-primary-300 transition duration-500`}
      onClick={() => setSelectedPage(lowercasePage)}
      >
        {page}
    </AnchorLink>
  )
}

export default Link