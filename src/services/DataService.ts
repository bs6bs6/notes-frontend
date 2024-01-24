import { User } from "../model/Model";
import { S3, config } from 'aws-sdk';
import { config as appConfig} from './config'


config.update({
    region: appConfig.REGION
})


export class DataService {

    private s3Client : S3 | undefined

    /**
     * Due to a bug, the s3 client doesn't load the credentials after they are created
     * Here we are initializing it lazily
     */
    private getS3Client():S3 {
        if (this.s3Client) {
            return this.s3Client
        } else {
            this.s3Client = new S3({
                region: appConfig.REGION
            }) 
            return this.s3Client;
        }
    }

    public async uploadAttachment(file: File){
        return await this.uploadPublicFile(file, appConfig.PROFILE_PHOTOS_BUCKET)
    }

    private async uploadPublicFile(file: File, bucket: string){
        const fileName = Math.random().toString(36).slice(2) +  file.name;
        const uploadResult = await this.getS3Client().upload({
            Bucket: bucket,
            Key: fileName,
            Body: file,
            ACL: 'public-read'
        }).promise();
        return uploadResult.Location
    }


}