import { Sheet } from '@tamagui/sheet';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const BottomSheet = ({
  open,
  setOpen,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
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
        {children}
      </Sheet.Frame>
    </Sheet>
  );
};
