const express = require('express')
const { STS } = require('ali-oss')
const app = express()

app.get('/sts', (req, res) => {
    let sts = new STS({
        // 填写步骤1创建的RAM用户AccessKey。
        accessKeyId: 'LTAI5tG82K2Axqf21wqoCGAA',
        accessKeySecret: 'PybUteR2QIt87wNldi0o4B4mznBUyQ'
    })
    // roleArn填写步骤2获取的角色ARN，例如CPUacs:ram::175708322470****:role/ramtest。
    // policy填写自定义权限策略，用于进一步限制STS临时访问凭证的权限。如果不指定Policy，则返回的STS临时访问凭证默认拥有指定角色的所有权限。
    // 临时访问凭证最后获得的权限是步骤4设置的角色权限和该Policy设置权限的交集。
    // expiration用于设置临时访问凭证有效时间单位为秒，最小值为900，最大值以当前角色设定的最大会话时间为准。本示例指定有效时间为3000秒。
    // sessionName用于自定义角色会话名称，用来区分不同的令牌，例如填写为sessiontest。
    sts.assumeRole('acs:ram::1767327971809179:role/ramosstest', ``, '40000', 'crazycatzhang')
        .then(result => {
            console.log(result)
            res.set('Access-Control-Allow-Origin', '*')
            res.set('Access-Control-Allow-METHOD', 'GET')
            res.json({
                AccessKeyId: result.credentials.AccessKeyId,
                AccessKeySecret: result.credentials.AccessKeySecret,
                SecurityToken: result.credentials.SecurityToken,
                Expiration: result.credentials.Expiration
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err.message)
        })
})

app.listen(3001, () => {
    console.log('服务器已启动....')
})
