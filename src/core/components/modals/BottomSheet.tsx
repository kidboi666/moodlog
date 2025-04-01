import { Sheet } from '@tamagui/sheet';
import { memo } from 'react';
import {
  BottomSheetProps,
  BottomSheetType,
} from '@/core/store/types/bottom-sheet.types';
import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { SelectMoodModal } from '@/core/components/modals/contents/SelectMoodModal';
import { JournalWriteModal } from '@/core/components/modals/contents/JournalWriteModal/JournalWriteModal';

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: memo(
    (props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL]) => (
      <DeleteJournalModal {...props} />
    ),
  ),
  [BottomSheetType.SELECT_MOOD]: memo(
    (props: BottomSheetProps[BottomSheetType.SELECT_MOOD]) => (
      <SelectMoodModal {...props} />
    ),
  ),
  [BottomSheetType.JOURNAL_WRITE]: memo(
    (props: BottomSheetProps[BottomSheetType.JOURNAL_WRITE]) => (
      <JournalWriteModal {...props} />
    ),
  ),
};

export const BottomSheet = memo(() => {
  const { state, hideBottomSheet } = useBottomSheet();
  const { isOpen, type, snapPoint, props } = state;

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
      snapPoints={snapPoint}
      dismissOnSnapToBottom
      animation="medium"
      zIndex={100_000}
    >
      <Sheet.Overlay
        animation="medium"
        bg="black"
        opacity={0.9}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle scale={0.6} />
      <Sheet.Frame>{renderContent()}</Sheet.Frame>
    </Sheet>
  );
});
