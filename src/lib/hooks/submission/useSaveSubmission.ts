import { trpc } from '@/lib/trpc';

import { PostSubmissionParams } from '@/server/routes/submission/postSubmission';
import { RequirementType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const useSaveSubmission = (events: {
  onMutate: () => void;
  onSuccess: (id?: string) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;
  let stringSubmissionParams:PostSubmissionParams;
  let fileSubmissionParams:PostSubmissionParams;
  let uuidKeys:{[key:string]: string} = {};
  const mutation = trpc.submission.post.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      onSuccess(data.submissionId);
    },
  });

  const presignMutation = trpc.file.createPresignedURL.useMutation({
    onSuccess: async (createPresignedPosts)=>{
      fileSubmissionParams.answers.forEach(async (fileAns)=>{
        const imgFile =  (fileAns.input as File[])[0];
        const requirementID = fileAns.requirement.id;
        const uuid = uuidKeys[requirementID];
        const {url, fields}:{url: string, fields: any} = (createPresignedPosts as {[key:string]:any})[uuid] ;
        const data = {
          ...fields,
          file: imgFile,
        }
        const formData = new FormData();
        for (const name in data){
          formData.append(name, data[name]);
        }
        await fetch(url, {
          method: "POST",
          body: formData
        });
      })
      overrideFileInputs();
      stringSubmissionParams.answers.push(...fileSubmissionParams.answers);
      save();
    },
    onError
  });

  function uploadAndSave() {
    let keys: string[] = [];
    fileSubmissionParams.answers.forEach((parms)=>{
      const image =  (parms.input as File[])[0];
      const key = `${uuidv4()}_${image.name}`;
      keys.push(key);
      uuidKeys[parms.requirement.id] = key;
    })

    presignMutation.mutate({keys});
  }

  function save() {
    mutation.mutate(stringSubmissionParams)
  }

  function processContent(p: PostSubmissionParams) {
    fileSubmissionParams ={...p,answers:[]};
    stringSubmissionParams = p;
    const imageFileAns = p.answers.filter((a)=>a.requirement.type === RequirementType.Image);
    const stringFileAns = p.answers.filter((a)=>a.requirement.type !== RequirementType.Image);
    // currently only support single file
    if(imageFileAns && imageFileAns.length>0){
      fileSubmissionParams.answers = imageFileAns;
    }
    stringSubmissionParams.answers = stringFileAns;
  }

  function overrideFileInputs() {
    fileSubmissionParams.answers = fileSubmissionParams.answers.map((ans)=>{
      ans.input = uuidKeys[ans.requirement.id] ?? "default";
      return ans;
    })
  }



  return {
    Save: async (p: PostSubmissionParams) => {
      processContent(p);
      if(fileSubmissionParams && fileSubmissionParams.answers.length>0){
        uploadAndSave();
      }else{
        save();
      }
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
