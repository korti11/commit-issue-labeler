export function getIssue(commitMessage: string, trigger: string): number {
    const formatedCommitMessage = formatString(commitMessage);
    const formatedTrigger = formatString(trigger);
    const index = formatedCommitMessage.indexOf(formatedTrigger);

    if(index == -1) {
        return -1;
    }

    var issue = findIssueBefore(formatedCommitMessage, index);
    if(issue == -1) issue = findIssueAfter(formatedCommitMessage, index, formatedTrigger.length);

    if(issue == -1) throw new Error("Found the trigger word but no issue number is provided.");
    return issue;
}
  
function formatString(input: string): string {
    return input.toString().toLowerCase().replace(/[\s|_|\-|\n]+/g, '');
}
  
function findIssueBefore(commitMessage: string, triggerPos: number): number {
    const message = commitMessage.slice(0, triggerPos)
    const tagIndex = message.lastIndexOf('#');
    if(tagIndex != -1) {
        return Number.parseInt(message.slice(tagIndex + 1, message.length))
    } else {
        return -1;
    }
}
  
function findIssueAfter(commitMessage: string, triggerPos: number, triggerLength: number): number {
    const message = commitMessage.slice(triggerPos + triggerLength);
    const tagIndex = message.indexOf('#');
    if(tagIndex != -1 && tagIndex < 2) {
        var issueLength = 0;
        var index = tagIndex + 1;
        while(!isNaN(Number(message.charAt(index))) && index < message.length){
            index++;
            issueLength++;
        }
        return Number.parseInt(message.slice(tagIndex + 1, issueLength + tagIndex + 1))
    } else {
        return -1;
    }
}
