import { Amplify } from "aws-amplify"
import { fetchAuthSession, signIn,SignInOutput,signOut,signUp,SignUpOutput,fetchUserAttributes } from "@aws-amplify/auth"
import { User } from '../model/Model'

Amplify.configure({
    Auth:{
        Cognito:{
            userPoolId: 'us-west-2_iPu42QNzy',
            userPoolClientId: '1mr69i4fdiispnfr4amaj06111',
            identityPoolId: 'us-west-2:87ba5545-1740-4885-940b-28650970cda7',
        }
    }
})


export class AuthService{

    public async signUp(username: string, password: string, email: string):Promise<SignUpOutput | undefined>{
        try {
            const result = await signUp({
                username,
                password,
                options:{
                    userAttributes:{
                        email
                    },
                }
            });
            return result;
        } catch (error) {
            console.error(error);
            return undefined
        }
    }



    public async login(userName: string, password: string){

        const result = await signIn({
            username: userName,
            password: password,
            options:{
                authFlowType: 'USER_PASSWORD_AUTH',
            }
        }) as SignInOutput;

        return result;
    }

    public async logOut(){
        return await signOut();
    }

    public async generateTemporaryCredentials(){
        return (await fetchAuthSession()).credentials;
    }

    public async getUserAttributes(){
        const attributes = (await fetchUserAttributes());
        return attributes
    }

    private async refreshCredentials(){
        return (await fetchAuthSession()).credentials;
    }

    public async getToken(){
        return (await fetchAuthSession()).tokens;
    }

    public async getSignedInStatus(){
        const session = await fetchAuthSession();
        if(session.tokens){
            return true;
        }
        return false;
    }


}
