const baseTokens = {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorError: '#ff4d4f',
    colorWarning: '#faad14',

    colorBgBase: '#ffffff',
    colorBgContainer: '#f5f7fa',

    fontSizeBase: 14,
    lineHeight: 1.5,

    borderRadius: 8,
    borderRadiusSM: 6,

    paddingBase: 12,
} as const

export default baseTokens
export type BaseTokens = typeof baseTokens
