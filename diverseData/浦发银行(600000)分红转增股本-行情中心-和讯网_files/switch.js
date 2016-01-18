function SwitchNewsTags(id,num,count)
{
	ClearTagClasss(id,count);
	document.getElementById("tagname_" + id + num).className = "label2";
	document.getElementById(id + num).className = "hexunShow";
	document.getElementById("label" + id + num).className = "hexunShow";
}
function ClearTagClasss(id,count)
{
	for(i=1;i<=count;i++)
	{
		document.getElementById("tagname_" + id + i).className = "label1";
		document.getElementById(id + i).className = "hexunHidden";
		document.getElementById("label" + id + i).className = "hexunHidden";
	}
}