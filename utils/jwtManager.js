const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'my-secret-key'
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'my-refresh-secret-key'

function gengrateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secret, { expiresIn })
}

function gengrateRefreshToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, refreshSecret, { expiresIn })
}

function verifyToken(token, uid) {
    try {
        const decoded = jwt.verify(token, secret)
        if (decoded.uid === uid) {
            return decoded
        } else {
            return null
        }
    } catch (e) {
        return null
    }
}

function verifyRefreshToken(refreshToken, uid) {
    try {
        const decoded = jwt.verify(refreshToken, refreshSecret)
        if (decoded.uid === uid) {
            return decoded
        } else {
            return null
        }
    } catch (err) {
        return null
    }
}

function refreshToken(token, expiresIn = '1h') {
    const decoded = verifyToken(token, '1')
    if (decoded) {
        const { uid, username, password } = decoded
        const newToken = gengrateToken({ uid, username, password }, expiresIn)
        return newToken
    } else {
        return null
    }
}

module.exports = {
    gengrateToken,
    gengrateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    refreshToken
}
