import { Href, Link } from 'expo-router';
import * as S from './NavigationSettingItem.styled';

interface NavigationSettingItemProps {
  icon?: any;
  label: string;
  href: Href;
  onNavigate?: () => void;
}

export const NavigationSettingItem = ({
  icon,
  label,
  href,
  onNavigate,
}: NavigationSettingItemProps) => {
  const handlePress = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <Link href={href} asChild onPress={handlePress}>
      <S.SettingsNavigationButton icon={icon}>
        {label}
      </S.SettingsNavigationButton>
    </Link>
  );
};
