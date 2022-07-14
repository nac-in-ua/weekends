import { useSettingsData, useSettingsDispatch } from '../store/Settings'
import { ISettings, Dispatch } from '../types'

const useSettings = (): [ISettings, Dispatch] => {
  return [useSettingsData(), useSettingsDispatch()]
}

export default useSettings
