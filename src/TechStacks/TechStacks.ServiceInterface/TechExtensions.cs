﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ServiceStack;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface
{
    public static class TechExtensions
    {
        public static void PopulateTechTiers(this TechStackDetails techStackDetails,
            List<TechnologyChoice> techs)
        {
            techStackDetails.TechnologyChoices = techs.Select(MergeTechnologyInformation).ToList();
        }

        public static TechnologyInStack MergeTechnologyInformation(TechnologyChoice technologyChoice)
        {
            var result = technologyChoice.ConvertTo<TechnologyInStack>();
            result.PopulateWith(technologyChoice.Technology);
            result.Id = technologyChoice.Id;
            return result;
        }

        /// <summary>
        /// From http://stackoverflow.com/a/2921135/670151
        /// </summary>
        /// <param name="phrase"></param>
        /// <returns></returns>
        public static string GenerateSlug(this string phrase)
        {
            string str = phrase.RemoveAccent().ToLower();
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim 
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            return str;
        }

        public static string RemoveAccent(this string txt)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(txt);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }
    }
}
