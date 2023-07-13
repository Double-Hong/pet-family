import OSS from 'ali-oss';

export const client = new OSS({
    region: 'oss-cn-chengdu',
    accessKeyId: 'Your ID',
    accessKeySecret: 'Your Secret',
    bucket: 'doublehong',
});
