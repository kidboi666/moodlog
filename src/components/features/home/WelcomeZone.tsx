import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack } from 'tamagui'

import { Delay, H1, H3, H4, ShakeEmoji } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useAuth } from '@/store'

function _WelcomeZone() {
  const { t } = useTranslation()
  const userName = useAuth(state => state.session?.user.user_metadata.user_name)

  return (
    <Fragment>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
        <XStack gap='$2' items='flex-end'>
          <H1>{t('common.greeting.hello')}</H1>
          <ShakeEmoji emoji='👋' />
        </XStack>
        <H3>{t('common.greeting.welcome', { name: userName })}</H3>
      </Delay>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
        <H4 color='$gray11'>{t('common.greeting.howAreYou')}</H4>
      </Delay>
    </Fragment>
  )
}

export const WelcomeZone = memo(_WelcomeZone)

WelcomeZone.displayName = 'WelcomeZone'
