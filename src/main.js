const URL_PARAMS = new URLSearchParams(location.search)

const MATRIX_CANVAS = document.getElementById('matrix')
const MATRIX_CTX = MATRIX_CANVAS.getContext('2d')
const C = document.getElementById('main')
const CTX = C.getContext('2d', { alpha: true })

// 初始设置 canvas 尺寸
let canvasHeight = window.innerHeight
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
MATRIX_CANVAS.width = windowWidth
MATRIX_CANVAS.height = canvasHeight
C.width = windowWidth
C.height = canvasHeight

let DEFAULT_CHAR_WIDTH = CTX.measureText('M').width
const DEFAULT_CHAR_HEIGHT = 16
const TEXT_BASELINE_OFFSET = 13

const welcomeTitle = ` 
============================================================




███╗   ███╗███████╗██╗   ██╗    ██████╗ ██╗███╗   ██╗ ██████╗ 
████╗ ████║██╔════╝██║   ██║    ██╔══██╗██║████╗  ██║██╔════╝ 
██╔████╔██║███████╗██║   ██║    ██████╔╝██║██╔██╗ ██║██║  ███╗
██║╚██╔╝██║╚════██║██║   ██║    ██╔═══╝ ██║██║╚██╗██║██║   ██║
██║ ╚═╝ ██║███████║╚██████╔╝    ██║     ██║██║ ╚████║╚██████╔╝
╚═╝     ╚═╝╚══════╝ ╚═════╝     ╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                        


============================================================
`
const WELCOMETITLE_LINE_CHARS = 60
const CONTINUOUS_PING_TIMES = 6
const ANIMATION_SPEED = 1
const VERSION = '0.3.1'

// 旧列表：IP:端口，只显示不测试，提示用户手动tcping
const OLD_MIRRORS = {
    'Ain ch.1': '18.176.79.10:8585',
    'Ain ch.2': '3.112.119.155:8585',
    'Ain ch.3': '52.197.194.155:8585',
    'Ain ch.4': '35.79.26.6:8585',
    'Ain ch.5': '54.64.47.212:8585',
    'Ain ch.6': '54.64.47.212:8586',
    'Ain ch.7': '35.75.33.109:8585',
    'Ain ch.8': '35.75.33.109:8586',
    'Ain ch.9': '57.181.203.81:8585',
    'Ain ch.10': '57.181.203.81:8586',
    'Ain ch.11': '54.65.159.42:8585',
    'Ain ch.12': '54.65.159.42:8586',
    'Ain ch.13': '18.177.179.145:8585',
    'Ain ch.14': '18.177.179.145:8586',
    'Ain ch.15': '13.115.72.186:8585',
    'Ain ch.16': '13.115.72.186:8586',
    'Ain ch.17': '13.114.24.162:8585',
    'Ain ch.18': '13.114.24.162:8586',
    'Ain ch.19': '57.182.28.187:8585',
    'Ain ch.20': '57.182.28.187:8586',
}

// 新列表：按3个分类组织的域名
const DOMAIN_CATEGORIES = {
    '1. MapleStory Universe / Nexon': {
        'msu.io': 'https://msu.io',
        'static.msu.io': 'https://static.msu.io',
        'msu-upload-static.msu.io': 'https://msu-upload-static.msu.io',
        'market-static.msu.io': 'https://market-static.msu.io',
        'msn-wvslogin.msu.io': 'https://msn-wvslogin.msu.io',
        'notification-sse.msu.io': 'https://notification-sse.msu.io',
        'henesys-rpc.msu.io': 'https://henesys-rpc.msu.io',
        'henesys-rpc.cdn.cloudflare.net': 'https://henesys-rpc.msu.io.cdn.cloudflare.net',
        'msn.dn.nexoncdn.co.kr': 'https://msn.dn.nexoncdn.co.kr',
        'config.livelog.nexon.com': 'https://config.livelog.nexon.com',
        'jp.livelog.nexon.com(与游戏服务器机房相同、大概)': 'https://jp.livelog.nexon.com',
        'psm-log.ngs.nexon.com': 'https://psm-log.ngs.nexon.com',
        'jyp.nexon.com': 'https://jyp.nexon.com',
    },
    '2. MetaMask / Web3Auth': {
        // Web3Auth
        'api.web3auth.io': 'https://api.web3auth.io',
        'api-wallet.web3auth.io': 'https://api-wallet.web3auth.io',
        'assets.web3auth.io': 'https://assets.web3auth.io',
        'auth.web3auth.io': 'https://auth.web3auth.io',
        'authjs.web3auth.io': 'https://authjs.web3auth.io',
        'images.web3auth.io': 'https://images.web3auth.io',
        'session.web3auth.io': 'https://session.web3auth.io',
        'wallet.web3auth.io': 'https://wallet.web3auth.io',
        // MetaMask API
        'accounts.api.cx.metamask.io': 'https://accounts.api.cx.metamask.io',
        'authentication.api.cx.metamask.io': 'https://authentication.api.cx.metamask.io',
        'bridge.api.cx.metamask.io': 'https://bridge.api.cx.metamask.io',
        'client-config.api.cx.metamask.io': 'https://client-config.api.cx.metamask.io',
        'client-side-detection.api.cx.metamask.io': 'https://client-side-detection.api.cx.metamask.io',
        'dapp-scanning.api.cx.metamask.io': 'https://dapp-scanning.api.cx.metamask.io',
        'defiadapters.api.cx.metamask.io': 'https://defiadapters.api.cx.metamask.io',
        'gas.api.cx.metamask.io': 'https://gas.api.cx.metamask.io',
        'gateway.api.cx.metamask.io': 'https://gateway.api.cx.metamask.io',
        'metamask-sdk.api.cx.metamask.io': 'https://metamask-sdk.api.cx.metamask.io',
        'mm-sdk-analytics.api.cx.metamask.io': 'https://mm-sdk-analytics.api.cx.metamask.io',
        'oidc.api.cx.metamask.io': 'https://oidc.api.cx.metamask.io',
        'on-ramp-content.api.cx.metamask.io': 'https://on-ramp-content.api.cx.metamask.io',
        'phishing-detection.api.cx.metamask.io': 'https://phishing-detection.api.cx.metamask.io',
        'price.api.cx.metamask.io': 'https://price.api.cx.metamask.io',
        'rewards.api.cx.metamask.io': 'https://rewards.api.cx.metamask.io',
        'security-alerts.api.cx.metamask.io': 'https://security-alerts.api.cx.metamask.io',
        'subscription.api.cx.metamask.io': 'https://subscription.api.cx.metamask.io',
        'token.api.cx.metamask.io': 'https://token.api.cx.metamask.io',
        'tx-sentinel-ethereum-mainnet.api.cx.metamask.io': 'https://tx-sentinel-ethereum-mainnet.api.cx.metamask.io',
        // MetaMask Other
        'acl.execution.metamask.io': 'https://acl.execution.metamask.io',
        'execution.metamask.io': 'https://execution.metamask.io',
        'metamask.github.io': 'https://metamask.github.io',
    },
    '3. Blockchain Infrastructure': {
        // Infura (以太坊及二层网络)
        'mainnet.infura.io': 'https://mainnet.infura.io',
        'arbitrum-mainnet.infura.io': 'https://arbitrum-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'base-mainnet.infura.io': 'https://base-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'bsc-mainnet.infura.io': 'https://bsc-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'ethereum-sepolia.infura.io': 'https://ethereum-sepolia.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'linea-mainnet.infura.io': 'https://linea-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'linea-sepolia.infura.io': 'https://linea-sepolia.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'optimism-mainnet.infura.io': 'https://optimism-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'polygon-mainnet.infura.io': 'https://polygon-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        // Infura (非EVM)
        'bitcoin-mainnet.infura.io': 'https://bitcoin-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        'solana-mainnet.infura.io': 'https://solana-mainnet.infura-router.public.blockchain-networks-1-prod-us-east-1.eks.infura.org',
        // Other Nodes
        'dimensional-special-breeze.quiknode.pro': 'https://dimensional-special-breeze.quiknode.pro',
        'quiet-methodical-seed.monad-testnet.quiknode.pro': 'https://quiet-methodical-seed.monad-testnet.quiknode.pro',
        'carrot.megaeth.com': 'https://carrot.megaeth.com',
        'chainid.network': 'https://chainid.network',
    },
}

let skipAnimation = false
let writing = false

let currentColumn = 1
let currentLine = 1

let frameRendered = 0

const callFn = (fn) => fn()

const getLatencyColor = (ms) => {
    if (ms >= 150) return '#f00'
    if (ms >= 100) return '#ff0'
    return '#0f0'  // 橙色替代绿色
}

// 黑客帝国风格的数字雨字符池
const MATRIX_DIGITS = '0123456789'
const MATRIX_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const MATRIX_SYMBOLS = '@#$%^&*()_+-=[]{}|;:,.<>?'
// 日文片假名更适合矩阵风格（竖长形状）
const MATRIX_JAPANESE = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
// 韩文辅音字母
const MATRIX_KOREAN = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'
// 组合成最终字符池，数字权重更高（矩阵中数字最常见）
const MATRIX_ALL_CHARS = MATRIX_DIGITS.repeat(4) + MATRIX_LETTERS + MATRIX_SYMBOLS + MATRIX_JAPANESE + MATRIX_KOREAN

const COLUMN_DROPS = []
const FONT_SIZE = 16  // 增大字体，更接近电影效果
const COLUMN_WIDTH = 20  // 固定列宽，确保垂直对齐
let matrixActive = true  // 始终激活数字雨

// DNS相关变量（与数字雨分离）
let activeRequestCount = 0

const initMatrix = () => {
    // 使用固定列宽确保字符垂直对齐，创造经典的矩阵列效果
    const columns = Math.floor(MATRIX_CANVAS.width / COLUMN_WIDTH)
    COLUMN_DROPS.length = 0
    for (let i = 0; i < columns; i++) {
        // 随机起始位置，创造错落有致的效果
        COLUMN_DROPS[i] = Math.random() * -200
    }
}

const drawMatrix = () => {
    // 黑客帝国风格：使用较快的淡化速度，创造经典的"拖尾"效果
    const time = Date.now() * 0.003  // 更高的频率
    const fadeOpacity = 0.1 + 0.05 * Math.sin(time * 1.2)  // 更快的周期变化
    MATRIX_CTX.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`
    MATRIX_CTX.fillRect(0, 0, MATRIX_CANVAS.width, MATRIX_CANVAS.height)

    // 设置字体为等宽字体，确保字符对齐
    MATRIX_CTX.font = `${FONT_SIZE}px 'Courier New', monospace`
    MATRIX_CTX.textBaseline = 'top'

    // 计算速度因子
    const speedFactor = 1 + (activeRequestCount * 0.2)

    for (let i = 0; i < COLUMN_DROPS.length; i++) {
        // 从字符池中选择字符
        const randomIndex = Math.floor(Math.random() * MATRIX_ALL_CHARS.length)
        const text = MATRIX_ALL_CHARS[randomIndex]
        
        // 使用固定列宽确保垂直对齐
        const x = i * COLUMN_WIDTH + 2  // 加2像素边距
        const y = COLUMN_DROPS[i] * FONT_SIZE

        // 黑客帝国经典效果：前导字符为亮白色，其余为绿色渐变
        const distanceFromTop = y / MATRIX_CANVAS.height
        
        if (distanceFromTop < 0.1) {
            // 前导字符：亮白色，模拟"光头"效果
            MATRIX_CTX.fillStyle = '#ffffff'
            MATRIX_CTX.shadowColor = '#00ff00'
            MATRIX_CTX.shadowBlur = 8
        } else {
            // 尾部字符：绿色渐变，距离越远越暗
            const intensity = Math.max(0.1, 1.0 - distanceFromTop)
            const greenValue = Math.floor(255 * intensity)
            MATRIX_CTX.fillStyle = `rgb(0, ${greenValue}, 0)`
            MATRIX_CTX.shadowColor = `rgba(0, 255, 0, ${intensity * 0.5})`
            MATRIX_CTX.shadowBlur = 4
        }
        
        // 绘制字符
        MATRIX_CTX.fillText(text, x, y)
        
        // 重置阴影
        MATRIX_CTX.shadowBlur = 0

        // 重置条件：字符超出屏幕时重新开始
        if (y > MATRIX_CANVAS.height + FONT_SIZE) {
            COLUMN_DROPS[i] = Math.random() * -50  // 快速重置到顶部
        }

        COLUMN_DROPS[i] += speedFactor
    }
}

const animateMatrix = () => {
    drawMatrix()
    requestAnimationFrame(animateMatrix)
}

const SCRAMBLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

const encryptText = (text, progress) => {
    const scrambleLength = Math.floor((1 - progress) * text.length)
    const result = []
    for (let i = 0; i < text.length; i++) {
        if (i < text.length - scrambleLength) {
            result.push(text[i])
        } else {
            result.push(SCRAMBLE_CHARS.charAt(Math.floor(Math.random() * SCRAMBLE_CHARS.length)))
        }
    }
    return result.join('')
}

const drawChars = (
    text,
    x,
    y,
    textColor = '#0a0',
    cursorColor = '#fff',
    highlighColor = '#0f0',
    cursor = true,
    useGlow = false,
    isFirstCall = true
) => {
    x = x | 0
    y = y | 0

    const baselineY = y + TEXT_BASELINE_OFFSET
    const textX = x | 0
    const highlightX = (x + DEFAULT_CHAR_WIDTH) | 0
    const cursorX = highlightX

    if (isFirstCall) {
        const maxTextLength = 8
        CTX.clearRect(x, y, maxTextLength * DEFAULT_CHAR_WIDTH, DEFAULT_CHAR_HEIGHT)
    } else {
        CTX.clearRect(
            textX,
            y,
            DEFAULT_CHAR_WIDTH * 3 | 0,
            DEFAULT_CHAR_HEIGHT | 0
        )
    }

    if (cursor) {
        const cursorIntensity = 0.5 + Math.sin(Date.now() / 100) * 0.5
        CTX.fillStyle = `rgba(255, 255, 255, ${cursorIntensity})`
        CTX.fillRect(
            cursorX,
            baselineY - DEFAULT_CHAR_HEIGHT + 4,
            DEFAULT_CHAR_WIDTH - 4 | 0,
            DEFAULT_CHAR_HEIGHT - 12 | 0
        )
    }

    CTX.fillStyle = textColor
    CTX.fillText(text[0], textX, baselineY)
    text.shift()
    frameRendered++

    if (text.length === 0) {
        writing = false
        CTX.clearRect(
            cursorX,
            baselineY - DEFAULT_CHAR_HEIGHT + 4,
            DEFAULT_CHAR_WIDTH - 4 | 0,
            DEFAULT_CHAR_HEIGHT - 12 | 0
        )
        return [x, y, currentColumn, currentLine]
    }

    CTX.fillStyle = highlighColor
    CTX.fillText(text[0], highlightX, baselineY)

    if (frameRendered % ANIMATION_SPEED === 0 && !skipAnimation) {
        requestAnimationFrame(() =>
            drawChars(
                text,
                x + DEFAULT_CHAR_WIDTH,
                y,
                textColor,
                cursorColor,
                highlighColor,
                cursor,
                useGlow,
                false
            )
        )
    } else {
        drawChars(
            text,
            x + DEFAULT_CHAR_WIDTH,
            y,
            textColor,
            cursorColor,
            highlighColor,
            cursor,
            useGlow,
            false
        )
    }
    return [x + DEFAULT_CHAR_WIDTH, y, currentColumn, currentLine]
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const _writeText = (
    text,
    x,
    y,
    textColor = '#fa0',
    cursorColor = '#fff',
    highlighColor = '#ff0',
    cursor = true,
    useEncryptEffect = false
) => {
    return new Promise((resolve) => {
            const startWriting = () => {
                if (useEncryptEffect) {
                    let progress = 0
                    const encryptAnimation = () => {
                        progress += 0.15
                        const encrypted = encryptText(text, progress)

                        const maxTextLength = 8
                        CTX.clearRect(x, y, maxTextLength * DEFAULT_CHAR_WIDTH, DEFAULT_CHAR_HEIGHT)

                    CTX.fillStyle = highlighColor
                    CTX.fillText(encrypted, x, y + TEXT_BASELINE_OFFSET)

                    if (progress < 1) {
                        requestAnimationFrame(encryptAnimation)
                    } else {
                        const [finalX, finalY, c, l] = drawChars(
                            [...text],
                            x,
                            y,
                            textColor,
                            cursorColor,
                            highlighColor,
                            cursor,
                            false
                        )
                        resolve([finalX, finalY, currentColumn, currentLine])
                    }
                }
                encryptAnimation()
            } else {
                const [finalX, finalY, c, l] = drawChars(
                    [...text],
                    x,
                    y,
                    textColor,
                    cursorColor,
                    highlighColor,
                    cursor,
                    false
                )
                resolve([finalX, finalY, currentColumn, currentLine])
            }
        }

        if (!writing) {
            writing = true
            startWriting()
        } else {
            requestAnimationFrame(() => {
                _writeText(text, x, y, textColor, cursorColor, highlighColor, cursor, useEncryptEffect)
                    .then(resolve)
            })
        }
    })
}

const writeln = (
    text,
    textColor = '#fa0',
    cursorColor = '#fff',
    highlighColor = '#ff0',
    cursor = true
) => {
    currentColumn = 1
    currentLine++
    return write(text, textColor, cursorColor, highlighColor, cursor)
}

const writeKeepPos = (
    text,
    textColor = '#fa0',
    cursorColor = '#fff',
    highlighColor = '#ff0',
    cursor = true
) => {
    return _writeText(
        text,
        currentColumn * DEFAULT_CHAR_WIDTH,
        currentLine * DEFAULT_CHAR_HEIGHT,
        textColor,
        cursorColor,
        highlighColor,
        cursor
    )
}

const write = (
    text,
    textColor = '#fa0',
    cursorColor = '#fff',
    highlighColor = '#ff0',
    cursor = true
) => {
    const [x, y, c, l] = _writeText(
        text,
        currentColumn * DEFAULT_CHAR_WIDTH,
        currentLine * DEFAULT_CHAR_HEIGHT,
        textColor,
        cursorColor,
        highlighColor,
        cursor
    )
    currentColumn += text.length + 1
    return [x, y, currentColumn, currentLine]
}

const writeParcel = (
    text,
    textColor = '#fa0',
    cursorColor = '#fff',
    highlighColor = '#ff0',
    cursor = true
) => {
    const x = currentColumn * DEFAULT_CHAR_WIDTH
    const y = currentLine * DEFAULT_CHAR_HEIGHT
    drawChars(
        [...text],
        x,
        y,
        textColor,
        cursorColor,
        highlighColor,
        false,
        false
    )
    currentColumn += text.length + 1
    return [x, y, currentColumn, currentLine]
}

const writelnParcel = (
    text,
    textColor = '#fa0',
    cursorColor = '#fff',
    highlighColor = '#ff0',
    cursor = true
) => {
    const x = currentColumn * DEFAULT_CHAR_WIDTH
    const y = currentLine * DEFAULT_CHAR_HEIGHT
    drawChars(
        [...text],
        x,
        y,
        textColor,
        cursorColor,
        highlighColor,
        false,
        false
    )
    currentColumn = 1
    currentLine++
    return [x, y, currentColumn, currentLine]
}

const printHello = () => {
    const titleLines = welcomeTitle.split('\n')
    // 字符画贴到最左边，不需要间距
    const uiCanvasWidth = 600  // UI Canvas宽度增加到600
    const windowWidth = window.innerWidth
    const availableWidth = windowWidth - uiCanvasWidth
    // --- 需要填满整个可用宽度
    const charsPerLine = Math.floor(availableWidth / DEFAULT_CHAR_WIDTH)
    const paddingChars = (charsPerLine - WELCOMETITLE_LINE_CHARS) / 2

    titleLines.forEach((e, i) => {
        let lineStr
        if (i === 1 || i === 15) {
            // --- 填满整个宽度
            lineStr = ' '.repeat(paddingChars) + e + ' '.repeat(paddingChars)
        } else {
            lineStr = ' '.repeat(paddingChars) + e
        }
        writelnParcel(lineStr, '#fa0', '#fff', '#fba', false)
    })
}

const httpGet = (url) => fetch(url).then((res) => res.json())

const writeDots = () => {
    write('-')
    requestAnimationFrame(writeDots)
}

let cachedIPData = null
const getIP = () => {
    if (cachedIPData) {
        return Promise.resolve(cachedIPData)
    }
    return httpGet('https://geo.risk3sixty.com/me').then(data => {
        cachedIPData = data
        return data
    })
}

const latencyCache = new Map()
const dnsCache = new Map()
const ipLocationCache = new Map()

// 解析域名获取 IP
const resolveDNS = async (domain) => {
    if (dnsCache.has(domain)) {
        return dnsCache.get(domain)
    }

    activeRequestCount++
    // 不再启动数字雨，DNS功能独立于数字雨
    try {
        const response = await fetch(`https://dns.alidns.com/resolve?name=${domain}&type=1`)
        const data = await response.json()
        
        if (data.Answer && data.Answer.length > 0) {
            const ips = data.Answer
                .filter(a => a.type === 1) // 只取 A 记录
                .map(a => a.data)
            dnsCache.set(domain, ips)
            return ips
        }
        return []
    } catch (e) {
        console.error('DNS resolution error:', e)
        return []
    } finally {
        activeRequestCount--
    }
}

// 获取 IP 的地理位置
const getIPLocation = async (ip) => {
    if (ipLocationCache.has(ip)) {
        return ipLocationCache.get(ip)
    }

    activeRequestCount++
    // 不再启动数字雨，DNS功能独立于数字雨
    try {
        const response = await fetch(`https://geo.risk3sixty.com/${ip}`)
        const data = await response.json()
        ipLocationCache.set(ip, data)
        return data
    } catch (e) {
        console.error('IP location error:', e)
        return null
    } finally {
        activeRequestCount--
    }
}

const getMirrorLatency = async (url) => {
    const urlObj = new URL(url)
    const fetchUrl = `${urlObj.origin}/?t=${Math.random()}`
    const start = performance.now()

    try {
        await fetch(fetchUrl, { mode: 'no-cors', cache: 'no-store' })
    } catch (e) {
        // 即使 fetch 报错，TCP 可能已经建立，继续尝试获取 timing
    }

    // 获取性能条目
    const entries = performance.getEntriesByName(fetchUrl)
    if (entries.length > 0) {
        const entry = entries[entries.length - 1]
        // 如果能拿到 connectEnd 和 connectStart，这就是最准的 TCP 握手时间
        if (entry.connectEnd > 0 && entry.connectStart > 0) {
            return Math.round(entry.connectEnd - entry.connectStart)
        }
    }

    // 降级方案：如果拿不到性能数据（因为跨域限制），只能用总耗时
    return Math.round(performance.now() - start)
}

//get longest string in array
const getLongestString = (arr) =>
    arr.reduce((a, b) => (a.length > b.length ? a : b))

const main = () => {
    CTX.font = '1rem cursive'
    CTX.fillStyle = '#fa0'
    DEFAULT_CHAR_WIDTH = CTX.measureText('M').width

    // 初始化并开始数字雨（独立于DNS功能）
    initMatrix()
    animateMatrix()

    printHello()
    writeParcel(' Local time :')
    writelnParcel(
        ` ${new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeStyle: 'long',
        }).format(new Date())}`,
        '#fff',
        '#fa0',
        '#f80',
        false
    )
    const [x, y, c, l] = writeParcel(' IP addr :')
    currentColumn = 1
    currentLine++

    getIP().then((ipData) => {
        const ipStr = `${ipData.ip} / ${ipData.country}${ipData.region ? ' / ' + ipData.region : ''}${ipData.city ? ' / ' + ipData.city : ''}`

        _writeText(
            ipStr,
            (DEFAULT_CHAR_WIDTH * c) | 0,
            y | 0,
            '#fff',
            '#fa0',
            '#f80',
            false,
            true
        )

        setTimeout(() => {
            CTX.fillStyle = 'rgba(255, 255, 255, 0.4)'
            CTX.fillRect((DEFAULT_CHAR_WIDTH * c) | 0, y | 0, ipStr.length * DEFAULT_CHAR_WIDTH, DEFAULT_CHAR_HEIGHT)
            setTimeout(() => {
                CTX.fillStyle = '#000'
                CTX.fillRect((DEFAULT_CHAR_WIDTH * c) | 0, y | 0, ipStr.length * DEFAULT_CHAR_WIDTH, DEFAULT_CHAR_HEIGHT)

                CTX.fillStyle = '#fff'
                CTX.fillText(ipStr, (DEFAULT_CHAR_WIDTH * c) | 0, y + TEXT_BASELINE_OFFSET)
            }, 80)
        }, 200)
    })

    // 计算总行数并设置 canvas 高度
    const oldMirrorCount = Object.keys(OLD_MIRRORS).length
    // 计算所有域名总数
    let totalDomainCount = 0
    Object.values(DOMAIN_CATEGORIES).forEach(domains => {
        totalDomainCount += Object.keys(domains).length
    })
    // 双列布局：标题 19 行 + 时间信息 2 行 + 3个分类（每个分类标题 1 行 + 域名数×0.5行）+ 额外间距
    const totalLines = 19 + 2 + (3 * 1) + Math.ceil(totalDomainCount / 2) + 2
    // 确保高度不超过963px
    const totalHeight = Math.min(totalLines * DEFAULT_CHAR_HEIGHT + 60, 963)

    const windowWidth = window.innerWidth
    MATRIX_CANVAS.width = windowWidth
    MATRIX_CANVAS.height = totalHeight
    C.width = windowWidth
    C.height = totalHeight

    listFetch()
}

const listFetch = () => {
    const oldMirrorEntries = Object.entries(OLD_MIRRORS)
    const categories = Object.entries(DOMAIN_CATEGORIES)

    // 先显示3个分类的域名 - 双列布局
    categories.forEach(([categoryName, domains]) => {
        currentLine++
        writelnParcel(`=== ${categoryName} ===`, '#ff0', '#fff', '#fff', false)

        const domainEntries = Object.entries(domains)
        const categoryLongestLength = getLongestString(Object.keys(domains)).length
        const startLine = currentLine

        // 双列布局：每个域名占0.5行（2个域名/行）
        domainEntries.forEach((m, domainIndex) => {
            const mirrorName = m[0]
            const mirrorUrl = m[1]
            const urlObj = new URL(mirrorUrl)
            const domain = urlObj.hostname

            // 计算列（左列或右列）
            const isLeftColumn = domainIndex % 2 === 0
            const lineOffset = Math.floor(domainIndex / 2)

            const flagStr = `${' '.repeat(categoryLongestLength - mirrorName.length)}${mirrorName}:`

            // 双列布局：左列从左边距开始，右列从中间开始
            const windowWidth = window.innerWidth
            const leftColumnX = currentColumn * DEFAULT_CHAR_WIDTH
            const rightColumnX = windowWidth / 2 + currentColumn * DEFAULT_CHAR_WIDTH
            const x = isLeftColumn ? leftColumnX : rightColumnX
            const y = (startLine + lineOffset) * DEFAULT_CHAR_HEIGHT

            CTX.fillStyle = '#fa0'
            CTX.fillText(flagStr, x, y + TEXT_BASELINE_OFFSET)

            // 计算延迟显示位置
            const latencyDisplayWidth = CONTINUOUS_PING_TIMES * 40 + 20
            const leftLatencyStartX = windowWidth / 2 - latencyDisplayWidth - 20
            const rightLatencyStartX = windowWidth - latencyDisplayWidth
            const latencyStartX = isLeftColumn ? leftLatencyStartX : rightLatencyStartX

            // 预填充占位符
            for (let i = 0; i < CONTINUOUS_PING_TIMES; i++) {
                const px = (latencyStartX + i * 40 + 10) | 0
                CTX.fillStyle = '#333'
                CTX.fillText('--', px, y + TEXT_BASELINE_OFFSET)
            }

            // 显示IP占位符（json格式，紧凑）
            const usedSpace = (flagStr.length + 2) * DEFAULT_CHAR_WIDTH
            const ipStartX = x + usedSpace
            CTX.fillStyle = '#666'
            // 更紧凑的json格式：ip和location在同一行，省略引号
            CTX.fillText(`{ip:..., loc:...}`, ipStartX, y + TEXT_BASELINE_OFFSET)
        })

        // 更新行号
        currentLine = startLine + Math.ceil(domainEntries.length / 2)

        // 然后异步获取数据并更新
        domainEntries.forEach((m, domainIndex) => {
            const mirrorName = m[0]
            const mirrorUrl = m[1]
            const urlObj = new URL(mirrorUrl)
            const domain = urlObj.hostname

            const isLeftColumn = domainIndex % 2 === 0
            const lineOffset = Math.floor(domainIndex / 2)

            const flagStr = `${' '.repeat(categoryLongestLength - mirrorName.length)}${mirrorName}:`

            const y = (startLine + lineOffset) * DEFAULT_CHAR_HEIGHT
            const windowWidth = window.innerWidth
            const leftColumnX = currentColumn * DEFAULT_CHAR_WIDTH
            const rightColumnX = windowWidth / 2 + currentColumn * DEFAULT_CHAR_WIDTH
            const x = isLeftColumn ? leftColumnX : rightColumnX

            const latencyDisplayWidth = CONTINUOUS_PING_TIMES * 40 + 20
            const leftLatencyStartX = windowWidth / 2 - latencyDisplayWidth - 20
            const rightLatencyStartX = windowWidth - latencyDisplayWidth
            const latencyStartX = isLeftColumn ? leftLatencyStartX : rightLatencyStartX

            const usedSpace = (flagStr.length + 2) * DEFAULT_CHAR_WIDTH
            const ipStartX = x + usedSpace

            // 解析 DNS
            resolveDNS(domain).then(ips => {
                if (ips.length > 0) {
                    // 获取第一个 IP 的位置
                    getIPLocation(ips[0]).then(location => {
                        if (location) {
                            // 清除并显示IP信息（紧凑格式，高亮location）
                            CTX.clearRect(ipStartX, y, latencyStartX - ipStartX - 10, DEFAULT_CHAR_HEIGHT)
                            const locationText = `${location.country}/${location.region}/${location.city}`
                            // 超紧凑格式：{ip:xxx.xxx.xxx.xxx, loc:国家/地区/城市}
                            const infoText = `{ip:${ips[0]}, loc:`
                            CTX.fillStyle = '#888'
                            CTX.fillText(infoText, ipStartX, y + TEXT_BASELINE_OFFSET)
                            CTX.fillStyle = '#88f'
                            CTX.fillText(locationText, ipStartX + CTX.measureText(infoText).width, y + TEXT_BASELINE_OFFSET)
                            CTX.fillStyle = '#888'
                            CTX.fillText('}', ipStartX + CTX.measureText(infoText + locationText).width, y + TEXT_BASELINE_OFFSET)
                        }
                    })
                }
            })

            // 立即执行第一次延迟
            getMirrorLatency(mirrorUrl).then((timeEscaped) => {
                const latencyColor = getLatencyColor(timeEscaped)
                const px = (latencyStartX + 10) | 0

                CTX.clearRect(px, y, 35, DEFAULT_CHAR_HEIGHT)
                CTX.fillStyle = latencyColor
                CTX.fillText(`${timeEscaped}ms`, px, y + TEXT_BASELINE_OFFSET)
            }).catch((err) => {
                console.error('First ping error:', err, 'URL:', mirrorUrl)
            })

            // 连续6次延迟
            for (let i = 0; i < CONTINUOUS_PING_TIMES; i++) {
                setTimeout(() => {
                    getMirrorLatency(mirrorUrl).then((timeoutDelayMs) => {
                        const latencyColor = getLatencyColor(timeoutDelayMs)
                        const px = (latencyStartX + i * 40 + 10) | 0

                        CTX.clearRect(px, y, 35, DEFAULT_CHAR_HEIGHT)
                        CTX.fillStyle = latencyColor
                        CTX.fillText(`${timeoutDelayMs}ms`, px, y + TEXT_BASELINE_OFFSET)
                    }).catch((err) => {
                        console.error('Ping error:', err)
                    })
                }, (i + 1) * 1000)
            }
        })
    })

    // 最后显示频道UI (Canvas UI for 20 IPs)
    if (oldMirrorEntries.length > 0) {
        // 创建UI容器 - 更宽更矮
        const uiCanvas = document.createElement('canvas')
        uiCanvas.id = 'uiCanvas'
        uiCanvas.width = 600  // 增加宽度以显示完整IP:端口
        uiCanvas.height = 200  // 减少高度
        uiCanvas.style.position = 'absolute'
        uiCanvas.style.zIndex = '5'
        uiCanvas.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)'
        uiCanvas.tabIndex = 0  // 允许接收键盘事件

        // 将canvas添加到页面
        document.body.appendChild(uiCanvas)

        const uiCtx = uiCanvas.getContext('2d')

        // ==========================================
        // 1. 配置常量 (Config) - 将OLD_MIRRORS数据填入频道配置
        // ==========================================
        const channelConfig = []
        oldMirrorEntries.forEach(([name, ip], index) => {
            // 保留完整IP:端口
            channelConfig.push({
                id: index + 1,
                label: `${ip}`,
                ip: ip,
                name: name,
                isActive: index === 0
            })
        })

        // 键盘导航：当前选中的索引
        let selectedIndex = 0
        const rows = 4
        const cols = 5

        // 用于显示"COPY CHANNEL"按钮位置（在键盘事件中使用）
        let btnChangeX = 0
        let btnChangeW = 0
        let footerY = 0

        // 全局样式配置
        const STYLE = {
            fontFamily: 'Arial, Helvetica, sans-serif',
            bgColor: '#e2e2e2',
            borderColor: '#000000',
            titleColor: '#ffcc00',
            textColor: '#ffffff',
            textStroke: '#000000',

            btnGreyTop: '#f4f4f4',
            btnGreyBottom: '#c0c0c0',

            btnBlueTop: '#00c6ff',
            btnBlueBottom: '#0072ff',

            btnOrangeTop: '#ffcc00',
            btnOrangeBottom: '#ff9900'
        }

        // ==========================================
        // 2. 绘图辅助函数
        // ==========================================

        function drawGradientButton(x, y, w, h, colorTop, colorBottom, radius = 5, border = true) {
            uiCtx.beginPath()
            uiCtx.roundRect(x, y, w, h, radius)

            const gradient = uiCtx.createLinearGradient(x, y, x, y + h)
            gradient.addColorStop(0, colorTop)
            gradient.addColorStop(1, colorBottom)

            uiCtx.fillStyle = gradient
            uiCtx.fill()

            if (border) {
                uiCtx.lineWidth = 1
                uiCtx.strokeStyle = 'rgba(0,0,0,0.3)'
                uiCtx.stroke()
            }

            uiCtx.beginPath()
            uiCtx.roundRect(x + 1, y + 1, w - 2, h / 2, [radius, radius, 0, 0])
            uiCtx.fillStyle = 'rgba(255,255,255,0.2)'
            uiCtx.fill()
        }

        function drawOutlinedText(text, x, y, fontSize = 12, align = 'center', fontWeight = '900') {
            uiCtx.font = `${fontWeight} ${fontSize}px ${STYLE.fontFamily}`
            uiCtx.textAlign = align
            uiCtx.textBaseline = 'middle'

            uiCtx.lineWidth = 3.5
            uiCtx.strokeStyle = STYLE.textStroke
            uiCtx.lineJoin = 'round'
            uiCtx.strokeText(text, x, y)

            uiCtx.fillStyle = STYLE.textColor
            uiCtx.fillText(text, x, y)
        }

        function drawBullIcon(x, y) {
            uiCtx.save()
            uiCtx.translate(x, y)

            uiCtx.beginPath()
            uiCtx.moveTo(-8, -6)
            uiCtx.lineTo(-4, 0)
            uiCtx.lineTo(-6, 4)
            uiCtx.lineTo(0, 8)
            uiCtx.lineTo(6, 4)
            uiCtx.lineTo(4, 0)
            uiCtx.lineTo(8, -6)
            uiCtx.lineTo(3, -4)
            uiCtx.lineTo(-3, -4)
            uiCtx.closePath()

            uiCtx.lineWidth = 3
            uiCtx.strokeStyle = '#000'
            uiCtx.stroke()
            uiCtx.fillStyle = '#ffaa00'
            uiCtx.fill()

            uiCtx.beginPath()
            uiCtx.moveTo(0, 6)
            uiCtx.lineTo(-3, 2)
            uiCtx.lineTo(3, 2)
            uiCtx.closePath()
            uiCtx.fillStyle = '#ffff00'
            uiCtx.fill()

            uiCtx.restore()
        }

        // ==========================================
        // 3. 主渲染逻辑
        // ==========================================
        function renderUI() {
            const W = uiCanvas.width
            const H = uiCanvas.height

            uiCtx.clearRect(0, 0, W, H)

            // 1. 窗口外框
            uiCtx.beginPath()
            uiCtx.roundRect(0, 0, W, H, 10)
            uiCtx.fillStyle = '#000000'
            uiCtx.fill()

            // 2. 顶部标题栏
            const titleHeight = 25
            uiCtx.beginPath()
            const titleGrad = uiCtx.createLinearGradient(0, 0, 0, titleHeight)
            titleGrad.addColorStop(0, '#444')
            titleGrad.addColorStop(0.5, '#222')
            titleGrad.addColorStop(1, '#000')
            uiCtx.roundRect(1, 1, W - 2, titleHeight, [9, 9, 0, 0])
            uiCtx.fillStyle = titleGrad
            uiCtx.fill()

            uiCtx.font = 'bold 10px Arial'
            uiCtx.textAlign = 'center'
            uiCtx.fillStyle = '#ffcc00'
            uiCtx.fillText("CHANNEL CHANGE", W / 2, 14)

            // 3. 内容区域背景
            const contentY = titleHeight
            const contentH = H - titleHeight - 35
            uiCtx.beginPath()
            const bgGrad = uiCtx.createLinearGradient(0, contentY, 0, H)
            bgGrad.addColorStop(0, '#dddddd')
            bgGrad.addColorStop(0.2, '#f2f2f2')
            bgGrad.addColorStop(1, '#ffffff')
            uiCtx.rect(5, contentY, W - 10, H - contentY - 5)
            uiCtx.fillStyle = bgGrad
            uiCtx.fill()

            // 4. 服务器 Header
            const headerY = contentY + 5
            const headerH = 30
            drawGradientButton(5, headerY, W - 10, headerH, '#33bbee', '#0088cc', 0, false)

            uiCtx.fillStyle = 'rgba(255,255,255,0.1)'
            for (let i = 0; i < W - 10; i += 2) {
                if (i % 4 === 0) uiCtx.fillRect(5 + i, headerY, 1, headerH)
            }

            drawBullIcon(30, headerY + 15)
            drawOutlinedText("Ain", 60, headerY + 15, 18, 'left', 'bold')

            // 5. 频道列表 Grid
            const gridX = 10
            const gridY = headerY + headerH + 5
            const btnGapX = 3
            const btnGapY = 3

            const btnW = (W - 20 - (cols - 1) * btnGapX) / cols
            const btnH = 20  // 减少按钮高度

            channelConfig.forEach((ch, index) => {
                const col = index % cols
                const row = Math.floor(index / cols)

                const x = gridX + col * (btnW + btnGapX)
                const y = gridY + row * (btnH + btnGapY)

                let colorTop = STYLE.btnGreyTop
                let colorBot = STYLE.btnGreyBottom

                if (ch.isActive) {
                    colorTop = STYLE.btnBlueTop
                    colorBot = STYLE.btnBlueBottom
                }

                drawGradientButton(x, y, btnW, btnH, colorTop, colorBot, 5)

                // 显示完整的IP:端口
                const ipText = ch.label
                if (ch.isActive) {
                    drawOutlinedText("▶ " + ipText, x + 5, y + btnH / 2, 8, 'left', 'bold')
                } else {
                    drawOutlinedText(ipText, x + btnW / 2, y + btnH / 2, 8, 'center', 'bold')
                }
            })

            // 6. 底部按钮区
            footerY = H - 28
            const footerBtnW = 100
            const footerBtnH = 20  // 减少按钮高度

            const btnCancelX = W - footerBtnW - 10
            drawGradientButton(btnCancelX, footerY, footerBtnW, footerBtnH, STYLE.btnOrangeTop, STYLE.btnOrangeBottom, 5)
            drawOutlinedText("CANCEL", btnCancelX + footerBtnW / 2, footerY + footerBtnH / 2, 11, 'center', 'bold')

            btnChangeX = btnCancelX - footerBtnW - 35
            btnChangeW = 130
            drawGradientButton(btnChangeX, footerY, btnChangeW, footerBtnH, STYLE.btnOrangeTop, STYLE.btnOrangeBottom, 5)
            drawOutlinedText("COPY CHANNEL", btnChangeX + btnChangeW / 2, footerY + footerBtnH / 2, 11, 'center', 'bold')
        }

        // 执行绘制
        renderUI()

        // 设置UI Canvas位置：在welcome字符画右边
        const uiCanvasWidth = 600
        const windowWidth = window.innerWidth
        const availableWidth = windowWidth - uiCanvasWidth
        const welcomeWidth = Math.floor((availableWidth / DEFAULT_CHAR_WIDTH - WELCOMETITLE_LINE_CHARS) / 2) * DEFAULT_CHAR_WIDTH + WELCOMETITLE_LINE_CHARS * DEFAULT_CHAR_WIDTH
        const uiLeft = welcomeWidth + 20
        const uiTop = 50

        uiCanvas.style.left = `${uiLeft}px`
        uiCanvas.style.top = `${uiTop}px`

        // 键盘事件监听
        uiCanvas.addEventListener('keydown', (e) => {
            let newSelectedIndex = selectedIndex
            const selectedRow = Math.floor(selectedIndex / cols)
            const selectedCol = selectedIndex % cols

            switch(e.key) {
                case 'ArrowUp':
                    if (selectedRow > 0) {
                        newSelectedIndex = selectedIndex - cols
                    }
                    break
                case 'ArrowDown':
                    if (selectedRow < rows - 1) {
                        newSelectedIndex = selectedIndex + cols
                    }
                    break
                case 'ArrowLeft':
                    if (selectedCol > 0) {
                        newSelectedIndex = selectedIndex - 1
                    }
                    break
                case 'ArrowRight':
                    if (selectedCol < cols - 1) {
                        newSelectedIndex = selectedIndex + 1
                    }
                    break
                case 'Enter':
                case ' ':
                    // 复制当前选中的频道IP
                    const selectedChannel = channelConfig[selectedIndex]
                    if (selectedChannel) {
                        navigator.clipboard.writeText(selectedChannel.ip).then(() => {
                            // 显示"COPIED!"提示
                            const W = uiCanvas.width
                            uiCtx.fillStyle = '#fff'
                            uiCtx.font = 'bold 12px Arial'
                            uiCtx.textAlign = 'center'
                            uiCtx.fillText("COPIED!", btnChangeX + btnChangeW / 2, footerY - 10)
                            setTimeout(() => renderUI(), 800)
                        })
                    }
                    break
            }

            if (newSelectedIndex !== selectedIndex) {
                selectedIndex = newSelectedIndex
                // 更新配置
                channelConfig.forEach((ch, i) => {
                    ch.isActive = i === selectedIndex
                })
                renderUI()
                e.preventDefault()
            }
        })

        // 聚焦到canvas以接收键盘事件
        uiCanvas.focus()
    }
}

main()

// 监听窗口大小变化
window.addEventListener('resize', () => {
    const oldMirrorCount = Object.keys(OLD_MIRRORS).length
    let totalDomainCount = 0
    Object.values(DOMAIN_CATEGORIES).forEach(domains => {
        totalDomainCount += Object.keys(domains).length
    })
    // 双列布局计算
    const totalLines = 19 + 2 + (3 * 1) + Math.ceil(totalDomainCount / 2) + 2
    const totalHeight = Math.min(totalLines * DEFAULT_CHAR_HEIGHT + 60, 963)

    // 更新UI Canvas的位置
    const uiCanvas = document.getElementById('uiCanvas')
    if (uiCanvas) {
        const uiCanvasWidth = 600
        const windowWidth = window.innerWidth
        const availableWidth = windowWidth - uiCanvasWidth
        const welcomeWidth = Math.floor((availableWidth / DEFAULT_CHAR_WIDTH - WELCOMETITLE_LINE_CHARS) / 2) * DEFAULT_CHAR_WIDTH + WELCOMETITLE_LINE_CHARS * DEFAULT_CHAR_WIDTH
        const uiLeft = welcomeWidth + 20
        const uiTop = 50

        uiCanvas.style.left = `${uiLeft}px`
        uiCanvas.style.top = `${uiTop}px`
    }

    const windowWidth = window.innerWidth
    MATRIX_CANVAS.width = windowWidth
    MATRIX_CANVAS.height = totalHeight
    C.width = windowWidth
    C.height = totalHeight

    initMatrix()
})