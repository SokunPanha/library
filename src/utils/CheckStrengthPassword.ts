import { patternOfStrengthPassword } from "./AnyVariable";
export  function CheckStrengthPassword(value:string){
        let completeList: any = []
          patternOfStrengthPassword.map((pattern:any)=>{
                    if(pattern.regx.test(value))
                     {
                         completeList.push({isComplete:pattern.isComplete})
                     }
                     completeList.push({label: pattern.label})
          })

          return completeList;
}