import { Href, Link } from 'expo-router';
import * as S from './NavigationSettingItem.styled';

interface NavigationSettingItemProps {
  icon?: any;
  label: string;
  href: Href;
}

export const NavigationSettingItem = ({
  icon,
  label,
  href,
}: NavigationSettingItemProps) => {
  return (
    <Link href={href} asChild>
      <S.SettingsNavigationButton icon={icon}>
        {label}
      </S.SettingsNavigationButton>
    </Link>
  );
};
