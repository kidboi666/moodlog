import {
  Blur,
  Canvas,
  Circle,
  Color,
  Paragraph,
  Skia,
} from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import {
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { useSkiaParagraph } from '@/hooks'
import { useStepProgress } from '@/store'

interface Props extends ViewProps {
  name: string
  color: SharedValue<string> | string
}

export function MoodPreviewItem({ name, color, ...props }: Props) {
  const {
    state: { currentStep },
  } = useStepProgress()
  const { paragraph } = useSkiaParagraph(name)
  const skiaColor = Skia.Color(color as unknown as Color)
  const r = 100
  const p = 80
  const canvasSize = r * 2 + p
  const center = r + p / 2
  const fullMoodPath = useSharedValue(center)
  const halfMoodPath = useSharedValue(center)
  const zeroMoodPath = useSharedValue(center)
  const blur = useSharedValue(10)
  const textX = useDerivedValue(() => fullMoodPath.value - r)
  const textY = useDerivedValue(() => fullMoodPath.value - 12)

  useEffect(() => {
    fullMoodPath.value = withSequence(
      withTiming(currentStep === 1 ? r : center, {
        duration: 1200,
        easing: Easing.inOut(Easing.quad),
      }),
      withRepeat(
        withTiming(currentStep === 1 ? r + 8 : center + 8, {
          duration: 3000,
        }),
        -1,
        true,
      ),
    )
    blur.value = withRepeat(withTiming(20, { duration: 2000 }), -1, true)
    zeroMoodPath.value = withSequence(
      withTiming(currentStep === 1 ? r + p : center, {
        duration: 1200,
        easing: Easing.inOut(Easing.quad),
      }),
      withRepeat(
        withTiming(currentStep === 1 ? r + p - 8 : center + 8, {
          duration: 4000,
        }),
        -1,
        true,
      ),
    )
  }, [currentStep])

  return (
    <View style={styles.container} {...props}>
      <Canvas
        style={{
          width: canvasSize,
          height: canvasSize,
        }}
      >
        <Circle cx={fullMoodPath} cy={fullMoodPath} r={r} color={skiaColor} />
        <Circle
          cx={halfMoodPath}
          cy={halfMoodPath}
          r={r}
          color={skiaColor}
          opacity={0.4}
        >
          <Blur blur={blur} />
        </Circle>
        <Circle
          cx={halfMoodPath}
          cy={halfMoodPath}
          r={r}
          color={skiaColor}
          opacity={0.4}
        />
        <Circle
          cx={zeroMoodPath}
          cy={zeroMoodPath}
          r={r}
          color={skiaColor}
          opacity={0.4}
        />
        <Paragraph
          paragraph={paragraph}
          x={textX}
          y={textY}
          color='white'
          width={r * 2}
        />
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
