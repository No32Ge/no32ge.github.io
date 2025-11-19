import {getLibraryMeta} from "./res/loadRes/index.js"



export default  async function getLibraryMetaTest(){
    console.log("得到最终数据:", await getLibraryMeta("http://127.0.0.1:8000/ge32/labs/GeSeed/library/index/libraryIndex.json","wonder"))
};

