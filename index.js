const helper = require("./helper")



function main (cmdArgs){

   helper.creatFileIfNotExist('./db.json')

    console.log(cmdArgs)
    const [,,operation,...options]= cmdArgs[2]

    const parsedOptions = helper.parseArgs(options)
    console.log(parsedOptions)


    switch (operation) {

        case 'add':
            helper.add(parsedOptions)
            break;

        case 'edit':
            helper.edit(parsedOptions)
            break;

        case 'list':
            helper.list(parsedOptions)
            break;

        case 'delete':
            helper.remove(parsedOptions)
            break; 

        case 'check':
            helper.check(parsedOptions)
            break;

        case 'uncheck':
            helper.uncheck()
            break;   
    
        default:
            break;
    }
}
main(process.argv)