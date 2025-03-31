import { Sheet } from '@tamagui/sheet';
import { memo } from 'react';
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size';
import {
  BottomSheetProps,
  BottomSheetType,
} from '@/core/store/types/bottom-sheet.types';
import { DeleteJournalModal } from '@/core/components/shared/modals/contents/DeleteJournalModal';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: memo(
    (props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL]) => (
      <DeleteJournalModal {...props} />
    ),
  ),
};

export const BottomSheet = memo(() => {
  const { state, hideBottomSheet } = useBottomSheet();
  const { isOpen, type, props } = state;

  const renderContent = () => {
    if (!type) return null;

    const ContentComponent = SheetContentComponents[type];
    if (!ContentComponent) return null;

    return <ContentComponent {...props} />;
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={isOpen}
      modal
      open={isOpen}
      onOpenChange={hideBottomSheet}
      snapPoints={DELETE_JOURNAL_SNAP_POINTS}
      dismissOnSnapToBottom
      animation="bouncy"
      zIndex={100_000}
    >
      <Sheet.Overlay
        animation="lazy"
        bg="$background"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle scale={0.6} />
      <Sheet.Frame p="$4" justify="center" items="center" gap="$5">
        {renderContent()}
      </Sheet.Frame>
    </Sheet>
  );
});
