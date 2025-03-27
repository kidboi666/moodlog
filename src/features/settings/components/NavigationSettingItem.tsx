import { Href } from 'expo-router';
import * as S from './NavigationSettingItem.styled';

interface NavigationSettingItemProps {
  icon?: any;
  label: string;
  href: Href;
  onRouteChange: (href: Href) => void;
}

export const NavigationSettingItem = ({
  icon,
  label,
  href,
  onRouteChange,
}: NavigationSettingItemProps) => {
  return (
    <S.SettingsNavigationButton icon={icon} onPress={() => onRouteChange(href)}>
      <S.ItemLabel>{label}</S.ItemLabel>
    </S.SettingsNavigationButton>
  );
};
