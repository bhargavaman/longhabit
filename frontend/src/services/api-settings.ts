import { UpdateUserSettingsFields } from '@/schemas/user-schema'
import { loginWithPassword } from './api-auth'
import { pb } from './pocketbase'

export async function getSettings(userId?: string) {
  userId ??= pb.authStore.record?.id

  const settings = await pb
    .collection('settings')
    .getFirstListItem(`user="${userId}"`)

  if (!settings) throw new Error('Could not fetch settings data')

  return settings
}

export async function updateUserSettings(
  userId: string,
  formData: UpdateUserSettingsFields
) {
  const {
    remindEmail,
    remindByEmailEnabled,
    theme,
    name,
    avatar,
    oldPassword,
    password,
    passwordConfirm
  } = formData
  const userIsChangingPassword = oldPassword && password && passwordConfirm

  const newUserData = await pb
    .collection('users')
    .update(
      userId,
      userIsChangingPassword
        ? { name, avatar, oldPassword, password, passwordConfirm }
        : { name, avatar }
    )

  userIsChangingPassword &&
    (await loginWithPassword(newUserData.email, password))

  const settings = await pb
    .collection('settings')
    .getFirstListItem(`user="${newUserData.id}"`)

  settings &&
    (await pb.collection('settings').update(settings.id, {
      remindEmail,
      remindByEmailEnabled,
      theme
    }))
}
