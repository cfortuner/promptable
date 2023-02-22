import {
  FlatList as ReactNativeFlatList,
  View as ReactNativeView,
  ScrollView as ReactNativeScrollView,
} from 'react-native'
import { styled } from 'nativewind'
import { Skeleton as MotiSkeleton } from 'moti/skeleton'
import { MotiView as DefaultMotiView } from 'moti'

export const View = styled(ReactNativeView)

export const ScrollView = styled(ReactNativeScrollView, 'flex-1')

export const FlatList = styled(ReactNativeFlatList)

// TODO: further review integration. Nativewind className not working.
export const Skeleton = styled(MotiSkeleton)

export const MotiView = styled(DefaultMotiView)
